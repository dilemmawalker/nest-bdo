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
 *         this.left = left;zz
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int[] findMode(TreeNode root) {
        ArrayList<Integer>arr=new ArrayList<>();
        solve(root,arr);

        int val=0;
        ArrayList<Integer>ans=new ArrayList<>();
        int arr.size();
        int s=0;
        for(int i=0;i<n;i++){
            if((i+1)<n && arr.get(i)==arr.get(i+1)){
                s++;
            }
            else{
                s++;
                if(s>val){
                    val=s;
                    ans=new ArrayList<Integer>();
                    ans.add(arr.get(i));
                }
                else if(s==val){
                    ans.add(arr.get(i));
                }
                s=0;
            }
        }

        n=ans.size();
        int[]anss=new int[n];
        for(int i=0;i<n;i++){
            anss[i]=ans.get(i);
        }
        return anss;
    }
    public void solve(root,arr){    //return inorder
        if(root==null)
        return;

        solve(root.left,arr);
        arr.add(root.val);
        solve(root.right,arr);

    }
}