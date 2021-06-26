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
    public boolean isValidBST(TreeNode root) {
        ArrayList<Integer>arr=new ArrayList<>();
        solve(root,arr);
        int n=arr.size();
        for(int i=1;i<n;i++){
            if(!(arr.get(i)>arr.get(i-1)))
            return false;
        }
        return true;
    }
    public void solve(TreeNode root,ArrayList<Integer>arr){
        if(root==null)
        return ;

        solve(root.left,arr);
        arr.add(root.val);
        solve(root.right,arr);

        return ;
    }
}