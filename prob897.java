/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode increasingBST(TreeNode root) {
        if(root==null || (root.left==null && root.right==null))
        return root;

        ArrayList<Integer>arr=new ArrayList<>();
        order(root,arr);
        TreeNode ans=new TreeNode(arr.get(0));
        TreeNode travel=ans;
        for(int i=1;i<arr.size();i++){
            travel.right=new TreeNode(arr.get(i));
            travel=travel.right;
        }
        return ans;
    }
    public void order(TreeNode root,ArrayList<Integer>arr){
        if(root==null)
        return;
        if(root.left!=null)
        order(root.left,arr);

        arr.add(root.val);
        
        if(root.right!=null)
        order(root.right,arr);
    }
}